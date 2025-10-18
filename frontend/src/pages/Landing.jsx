import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <Navbar />
      <section className="bg-gradient-to-br from-blue-500 to-purple-600 text-white py-24 text-center">
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Welcome to CrowdSense
        </motion.h1>
        <p className="text-lg opacity-90 mb-8">
          Real-time crowd analytics that empower smarter, safer decisions.
        </p>
        <Link
          to="/login"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100"
        >
          Get Started
        </Link>
      </section>

      <section className="max-w-5xl mx-auto py-16 px-6 text-gray-700 text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose CrowdSense?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="font-semibold text-lg mb-2">📊 Real-Time Data</h3>
            <p>Monitor live device counts and congestion trends instantly.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="font-semibold text-lg mb-2">🧠 AI Insights</h3>
            <p>Gain actionable insights from intelligent analysis models.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="font-semibold text-lg mb-2">⚙️ Easy Integration</h3>
            <p>Seamlessly connect with your IoT sensors and dashboards.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
