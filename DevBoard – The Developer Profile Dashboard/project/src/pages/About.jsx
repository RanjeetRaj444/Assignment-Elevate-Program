import React from 'react';
import { Code, GitBranch, Cpu, Layout, Moon, Shield, Grid } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 mb-4">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

const About = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'Context-based authentication system with protected routes and user session management.'
    },
    {
      icon: Moon,
      title: 'Theme Switching',
      description: 'Toggle between light and dark themes with automatic persistence of your preferences.'
    },
    {
      icon: Layout,
      title: 'Developer Profile',
      description: 'View and manage your professional profile with company information and location.'
    },
    {
      icon: Code,
      title: 'Status Updates',
      description: 'Share your current developer status with custom messages to express your mood.'
    },
    {
      icon: Cpu,
      title: 'React Hooks',
      description: 'Built with modern React hooks like useContext, useEffect, and useRef for optimal performance.'
    },
    {
      icon: Grid,
      title: 'Responsive Design',
      description: 'Fully responsive interface that works seamlessly across desktop, tablet, and mobile devices.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center">
          <Code size={32} className="text-blue-600 dark:text-blue-400 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">About DevBoard</h1>
        </div>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
          Your personal developer dashboard for tracking profile information and status
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 shadow-md transition-colors duration-300">
        <div className="flex items-center mb-4">
          <GitBranch size={24} className="text-blue-600 dark:text-blue-400 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Technical Implementation</h2>
        </div>
        <div className="space-y-2 text-gray-700 dark:text-gray-300">
          <p>This application demonstrates several React concepts and best practices:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Context API for global state management</li>
            <li>Private routes with authentication protection</li>
            <li>API integration with JSONPlaceholder</li>
            <li>Form handling with controlled inputs and refs</li>
            <li>Conditional rendering based on auth and data states</li>
            <li>Theme toggling with localStorage persistence</li>
            <li>Responsive design using Tailwind CSS</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;