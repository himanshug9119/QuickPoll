import React from 'react';
import { FaPoll, FaChartBar, FaShieldAlt, FaUsers } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">About Us</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Our Mission</h2>
          <div className="flex flex-col md:flex-row items-center md:space-x-8">
            <div className="flex-shrink-0 mb-6 md:mb-0">
              <img
                src="https://via.placeholder.com/600x400?text=Our+Mission"
                alt="Our Mission"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <p className="text-gray-600 leading-relaxed">
              At QuickPoll, our mission is to empower every individual to voice their opinions and influence the world. We believe in the power of collective insights and strive to create a platform where your opinions matter. Our goal is to provide a space where people can easily engage in meaningful discussions and share their perspectives on a wide range of topics.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">What We Offer</h2>
          <div className="flex flex-col md:flex-row items-center md:space-x-8">
            <div className="flex-shrink-0 mb-6 md:mb-0">
              <img
                src="https://via.placeholder.com/600x400?text=Our+Offerings"
                alt="Our Offerings"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed space-y-4">
              <li>
                <FaPoll className="inline text-blue-600 mr-2" />
                <strong>User-Friendly Poll Creation:</strong> Creating a poll is intuitive and straightforward. Just fill out a simple form to start gathering opinions quickly and efficiently.
              </li>
              <li>
                <FaChartBar className="inline text-green-600 mr-2" />
                <strong>Real-Time Results:</strong> Watch results unfold live as participants vote. This feature helps you get immediate insights and make timely decisions.
              </li>
              <li>
                <FaShieldAlt className="inline text-yellow-600 mr-2" />
                <strong>Detailed Analytics:</strong> Dive deep into your poll data with comprehensive analytics. Understand trends, demographics, and more to gain valuable insights.
              </li>
              <li>
                <FaUsers className="inline text-red-600 mr-2" />
                <strong>Engagement & Interaction:</strong> Connect with others through discussions, feedback, and social media sharing to enhance community engagement.
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Why Choose QuickPoll?</h2>
          <div className="space-y-4">
            <div className="flex items-start mb-4">
              <FaPoll className="text-blue-600 text-3xl mr-4" />
              <div>
                <p className="text-gray-600 leading-relaxed">
                  <strong>Simplicity:</strong> Our platform is designed to be intuitive and accessible for users of all levels. Creating and participating in polls is straightforward and hassle-free.
                </p>
              </div>
            </div>
            <div className="flex items-start mb-4">
              <FaShieldAlt className="text-yellow-600 text-3xl mr-4" />
              <div>
                <p className="text-gray-600 leading-relaxed">
                  <strong>Privacy & Security:</strong> We prioritize the security of your data with state-of-the-art encryption and privacy controls. Your information is safe with us.
                </p>
              </div>
            </div>
            <div className="flex items-start mb-4">
              <FaUsers className="text-red-600 text-3xl mr-4" />
              <div>
                <p className="text-gray-600 leading-relaxed">
                  <strong>Community Focused:</strong> We are dedicated to our users and continuously improve based on your feedback. Our support team is here to assist you with any questions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Join Us</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Be part of the QuickPoll community and start exploring the diversity of opinions today. Whether you want to create engaging polls or simply participate, we welcome you to our platform.
          </p>
          <p className="text-gray-600">
            For support or inquiries, reach out to us at <a href="mailto:support@quickpoll.com" className="text-blue-500 hover:underline">support@quickpoll.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
