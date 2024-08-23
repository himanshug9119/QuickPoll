import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PollForm from "../components/CreatePollForm"; // Custom component
import { usePollForm } from "../Hooks/Hook.PollForm"; // Custom hook
import Loader from "../components/Loader"; // Assume you have a Loader component

const CreatePoll = () => {
  const {
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
  } = usePollForm();

  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (options.length > 0 || question.trim() !== "") {
        event.preventDefault();
        event.returnValue = ""; // Standard for most browsers
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [options, question]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (options.length < 2) {
      setError("A poll must have at least two options.");
      return;
    }
    const poll = {
      question,
      options: options.map((option) => ({ optionText: option })),
      createdBy: currentUser._id,
    };
    try {
      setLoading(true); // Start loading
      const res = await fetch("/api/poll/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(poll),
      });
      const data = await res.json();
      if (res.status !== 201) {
        alert(data.message);
        return;
      }
      alert("Poll created successfully");
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-5 p-8 border border-gray-300 rounded-lg bg-gray-50 shadow-lg">
      <h2 className="text-center text-3xl font-bold mb-6 text-blue-600">
        {step === 1 ? "Create a Poll" : "Enter Options"}
      </h2>

      {loading ? (
        <Loader /> // Display loader while submitting
      ) : (
        <>
          {step === 1 ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Enter poll question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                required
              />
              <button
                type="submit"
                className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            </form>
          ) : (
            <PollForm
              question={question}
              options={options}
              addOption={addOption}
              handleOptionChange={handleOptionChange}
              handleDeleteOption={handleDeleteOption}
              handleUndoDelete={handleUndoDelete}
              deletedOptions={deletedOptions}
              setStep={setStep}
              handleSubmit={handleSubmit}
              error={error}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CreatePoll;
