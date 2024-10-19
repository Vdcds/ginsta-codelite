"use client";
import React from "react";
import { motion } from "framer-motion";
// Importing GitHub, Twitter, and LinkedIn icons from react-icons
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import Image from "next/image"; // Import Next.js Image component

function About() {
  const teamMembers = [
    {
      name: "Sairaj Jawlikar",
      title: "Leader",
      img: "", // Leave empty as per your request
      github: "https://github.com/vrushalikudande",
      linkedin: "https://www.linkedin.com/in/vrushalikudande/",
      twitter: "https://twitter.com/vrushalikudande",
    },
    {
      name: "Vendant Chaware",
      title: "Frontend/Backend",
      img: "", // Leave empty
      github: "https://github.com/pratik-mahalle",
      linkedin: "https://www.linkedin.com/in/mahalle-pratik/",
      twitter: "https://x.com/PratikMahalle10",
    },
    {
      name: "Shubham Choure",
      title: "Frontend",
      img: "", // Leave empty
      github: "https://github.com/GhanashyamKadam",
      linkedin: "https://www.linkedin.com/in/ghanashyamkadam/",
      twitter: "https://x.com/Ghanashyam3f4",
    },
    {
      name: "Anandi Bhosale",
      title: "Frontend",
      img: "", // Leave empty
      github: "https://github.com/GhanashyamKadam",
      linkedin: "https://www.linkedin.com/in/ghanashyamkadam/",
      twitter: "https://x.com/Ghanashyam3f4",
    },
    // Add other team members as needed
  ];

  return (
    <motion.div
      className="flex flex-col justify-center items-center px-4 py-20 bg-white text-black"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="mb-12 text-4xl font-bold text-center">
        About Us
      </h2>
      <p className="mb-8 text-lg text-center max-w-2xl">
        We are a passionate team dedicated to building innovative solutions and
        collaborating on exciting projects. Meet our core team members who
        drive our mission forward!
      </p>

      <div className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center p-6 transition-all duration-300 rounded-lg shadow-lg bg-gray-100 hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="w-32 h-32 mb-4 overflow-hidden rounded-full">
              {/* Use the Next.js Image component */}
              <Image
                src={member.img || "/default-profile.png"} // Default image or empty
                alt={member.name}
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="mb-4 text-gray-700">{member.title}</p>
            <div className="flex space-x-4">
              <a
                href={member.github}
                className="text-gray-600 transition-colors hover:text-gray-800"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href={member.linkedin}
                className="text-gray-600 transition-colors hover:text-gray-800"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href={member.twitter}
                className="text-gray-600 transition-colors hover:text-gray-800"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default About;
