import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">About Us</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            At QuickPoll, we believe that everyone's voice matters. Our mission is to create a space where users can easily share their thoughts and opinions on a variety of topics. We aim to foster a community where diverse perspectives are welcomed and valued.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed">
            <li className="mb-2">
              <strong>User-Friendly Poll Creation:</strong> Crafting a poll is as simple as filling out a form. Add your question, list the options, and share your poll with others.
            </li>
            <li className="mb-2">
              <strong>Real-Time Results:</strong> As users vote, results are updated in real-time, providing immediate feedback to poll creators.
            </li>
            <li className="mb-2">
              <strong>Detailed Analytics:</strong> QuickPoll offers detailed analytics, including demographic breakdowns and trends, helping users understand the nuances behind the numbers.
            </li>
            <li className="mb-2">
              <strong>Engagement & Interaction:</strong> Engage in discussions, provide feedback, and share polls across social media.
            </li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Why Choose QuickPoll?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>Simplicity:</strong> Our platform is designed to be intuitive, ensuring that users of all tech-savviness levels can easily create and participate in polls.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>Privacy & Security:</strong> We prioritize your data security with advanced encryption and data protection methods.
          </p>
          <p className="text-gray-600 leading-relaxed">
            <strong>Community Focused:</strong> We value our users and continuously work on improving the platform based on your feedback. Our support team is always available to assist you with any queries.
          </p>
        </section>
        
        <section className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Join Us</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Whether you're here to create polls or simply to participate, we welcome you to the QuickPoll community. Together, we can explore the diversity of opinions and learn from each other. Join us today and be a part of the conversation!
          </p>
          <p className="text-gray-600">
            For support, contact us at <a href="mailto:support@pollit.com" className="text-blue-500 underline">support@pollit.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
