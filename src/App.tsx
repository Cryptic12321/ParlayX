import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FaTwitter, FaTelegram, FaDiscord, FaChartLine, FaUsers, FaLock, FaRocket } from 'react-icons/fa'
import { useInView } from 'react-intersection-observer'
import beachMonkey from './assets/beach-monkey.png'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

function App() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true })
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true })
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true })
  const [tokenomicsRef, tokenomicsInView] = useInView({ triggerOnce: true })
  const [roadmapRef, roadmapInView] = useInView({ triggerOnce: true })
  const [copied, setCopied] = useState(false);
  const tokenAddress = 'So1anaBeachCoinTokenAddress1234567890'; // Replace with your real address

  const scrollToSection = (ref: any) => {
    if (typeof ref === 'function') {
      // If it's a function ref, do nothing (cannot scroll directly)
      // Optionally, you could store the node in a state when the ref is called
      // and scroll to it later
    } else if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(tokenAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-purple-900 text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-black/30 backdrop-blur-md z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 text-2xl font-bold">
            <span>Beach Coin</span>
          </div>
          <div className="space-x-6">
            <button onClick={() => scrollToSection(aboutRef)} className="hover:text-blue-400 transition">About</button>
            <button onClick={() => scrollToSection(featuresRef)} className="hover:text-blue-400 transition">Features</button>
            <button onClick={() => scrollToSection(tokenomicsRef)} className="hover:text-blue-400 transition">Tokenomics</button>
            <button onClick={() => scrollToSection(roadmapRef)} className="hover:text-blue-400 transition">Roadmap</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="h-screen flex flex-col-reverse md:flex-row items-center justify-center text-center md:text-left px-4 gap-2 md:gap-12"
      >
        <div className="max-w-2xl flex-1 flex flex-col justify-center items-center md:items-end md:justify-center h-full">
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Solana Beach Coin
          </h1>
          <p className="text-xl mb-8">
            The most degen beach token on Solana. Join the wave of the future!
          </p>
          <div className="flex items-center mb-6">
            <span className="bg-white/10 px-3 py-2 rounded-l-lg font-mono text-sm select-all">
              {tokenAddress}
            </span>
            <button
              onClick={handleCopy}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r-lg text-white font-bold transition focus:outline-none"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-full font-bold transition">
              Buy Now
            </button>
            <button className="bg-purple-500 hover:bg-purple-600 px-8 py-3 rounded-full font-bold transition">
              Join Community
            </button>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center mb-8 md:mb-0">
          <img
            src={beachMonkey}
            alt="Beach Monkey"
            className="w-80 md:w-[450px] h-auto rounded-2xl shadow-lg border-4 border-white/20 bg-white/10"
          />
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        ref={aboutRef}
        initial="hidden"
        animate={aboutInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-20 px-4"
      >
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-8 text-center">About Beach Coin</h2>
          <p className="text-lg mb-6">
            Solana Beach Coin is not just another meme token. We're building a community-driven ecosystem
            that brings the beach vibes to the Solana blockchain. Our mission is to create the most
            fun and engaging token experience while maintaining real utility and value.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <FaUsers className="text-4xl mb-4 text-blue-400" />
              <h3 className="text-xl font-bold mb-2">Community First</h3>
              <p>Built by degens, for degens. Your voice matters in our ecosystem.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <FaLock className="text-4xl mb-4 text-blue-400" />
              <h3 className="text-xl font-bold mb-2">Secure & Fast</h3>
              <p>Powered by Solana's lightning-fast blockchain with top-tier security.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <FaChartLine className="text-4xl mb-4 text-blue-400" />
              <h3 className="text-xl font-bold mb-2">Real Utility</h3>
              <p>More than just a meme - we're building real use cases and partnerships.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Tokenomics Section */}
      <motion.section
        ref={tokenomicsRef}
        initial="hidden"
        animate={tokenomicsInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-20 px-4 bg-black/20"
      >
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Tokenomics</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Total Supply</h3>
              <p className="text-3xl font-bold text-blue-400">1,000,000,000</p>
              <p className="mt-2">BEACH tokens</p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Distribution</h3>
              <ul className="space-y-2">
                <li>• 40% Community & Liquidity</li>
                <li>• 25% Development & Marketing</li>
                <li>• 20% Team (Vested)</li>
                <li>• 15% Ecosystem Growth</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Roadmap Section */}
      <motion.section
        ref={roadmapRef}
        initial="hidden"
        animate={roadmapInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-20 px-4"
      >
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Roadmap</h2>
          <div className="space-y-8">
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <FaRocket className="text-2xl mr-4 text-blue-400" />
                <h3 className="text-xl font-bold">Phase 1: Launch</h3>
              </div>
              <ul className="list-disc list-inside space-y-2">
                <li>Website Launch</li>
                <li>Community Building</li>
                <li>Token Launch on Solana</li>
                <li>Initial Marketing Push</li>
              </ul>
            </div>
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <FaRocket className="text-2xl mr-4 text-blue-400" />
                <h3 className="text-xl font-bold">Phase 2: Growth</h3>
              </div>
              <ul className="list-disc list-inside space-y-2">
                <li>CEX Listings</li>
                <li>Partnership Announcements</li>
                <li>Community Events</li>
                <li>Staking Platform</li>
              </ul>
            </div>
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <FaRocket className="text-2xl mr-4 text-blue-400" />
                <h3 className="text-xl font-bold">Phase 3: Expansion</h3>
              </div>
              <ul className="list-disc list-inside space-y-2">
                <li>NFT Collection</li>
                <li>Mobile App Development</li>
                <li>Governance Platform</li>
                <li>Global Marketing Campaign</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-black/30">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="text-2xl hover:text-blue-400 transition">
              <FaTwitter />
            </a>
            <a href="#" className="text-2xl hover:text-blue-400 transition">
              <FaTelegram />
            </a>
            <a href="#" className="text-2xl hover:text-blue-400 transition">
              <FaDiscord />
            </a>
          </div>
          <p className="text-sm text-gray-400">
            © 2024 Solana Beach Coin. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App 