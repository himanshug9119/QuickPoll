import { useState } from 'react';

export const usePollForm = () => {
  const [step, setStep] = useState(1);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [deletedOptions, setDeletedOptions] = useState([]);
  const [error, setError] = useState(null);

  const addOption = () => {
    setOptions([...options, '']);
    setError(null);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setError(null);
    setOptions(newOptions);
  };

  const handleDeleteOption = (index) => {
    if (options.length > 2) {
      const optionToDelete = options[index];
      if (optionToDelete.trim() !== '') {
        setDeletedOptions([...deletedOptions, optionToDelete]);
      }
      setOptions(options.filter((_, i) => i !== index));
      setError(null);
    } else {
      setError('A poll must have at least two options.');
    }
  };

  const handleUndoDelete = () => {
    if (deletedOptions.length > 0) {
      const restoredOption = deletedOptions.pop();
      setOptions([...options, restoredOption]);
      setDeletedOptions([...deletedOptions]);
      setError(null);
    }
  };

  return {
    step,
    setStep,
    question,
    setQuestion,
    options,
    addOption,
    handleOptionChange,
    handleDeleteOption,
    handleUndoDelete,
    error,
    setError,
    deletedOptions,
  };
};
