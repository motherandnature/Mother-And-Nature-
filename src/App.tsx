/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Leaf, 
  Heart, 
  Sun, 
  Wind, 
  HandHeart, 
  Globe, 
  Sparkles, 
  ArrowRight,
  Languages,
  TreePine,
  Bird,
  Waves,
  Copy,
  Check
} from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import Markdown from "react-markdown";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { POEM_ASSAMESE, POEM_ENGLISH, CORE_VALUES } from "./constants";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export default function App() {
  const [isEnglish, setIsEnglish] = useState(false);
  const [wisdom, setWisdom] = useState<string | null>(null);
  const [isLoadingWisdom, setIsLoadingWisdom] = useState(false);
  const [activeTab, setActiveTab] = useState<"poem" | "values" | "wisdom">("poem");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = isEnglish ? POEM_ENGLISH : POEM_ASSAMESE;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateWisdom = async () => {
    setIsLoadingWisdom(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Generate a short, poetic, and spiritual message about the connection between humans, Mother, and Nature. Inspired by the philosophy of 'Ma aru Prakriti' (Mother and Nature). Keep it under 100 words. Use a peaceful and reverent tone.",
        config: {
          systemInstruction: "You are a spiritual guide and environmental philosopher who believes in the sacred unity of Mother and Nature.",
        }
      });
      setWisdom(response.text || "Nature speaks in silence. Listen with your heart.");
    } catch (error) {
      console.error("Error generating wisdom:", error);
      setWisdom("The earth has music for those who listen.");
    } finally {
      setIsLoadingWisdom(false);
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-nature-200 selection:text-nature-900">
      {/* Hero Section */}
      <header className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop" 
            alt="Ancient Forest"
            className="w-full h-full object-cover brightness-50 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-nature-50" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 text-center px-4 max-w-4xl"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Leaf className="w-6 h-6 text-nature-300 animate-pulse" />
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-nature-200">
              Sacred Earth Hymn
            </span>
            <Leaf className="w-6 h-6 text-nature-300 animate-pulse rotate-180" />
          </div>
          
          <h1 className="font-display text-6xl md:text-8xl font-bold mb-6 tracking-tight leading-[1.1]">
            মা আৰু প্ৰকৃতি
          </h1>
          <p className="font-serif italic text-2xl md:text-3xl text-nature-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            "Victory to Mother and Nature, by your grace the world survives."
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const el = document.getElementById('content');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-sm font-medium hover:bg-white/20 transition-all flex items-center gap-2 mx-auto"
          >
            Enter the Sanctuary <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-8 opacity-50">
          <TreePine className="w-6 h-6" />
          <Bird className="w-6 h-6" />
          <Waves className="w-6 h-6" />
        </div>
      </header>

      {/* Main Content */}
      <main id="content" className="max-w-6xl mx-auto px-4 py-20 -mt-20 relative z-20">
        
        {/* Navigation Tabs */}
        <nav className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-nature-100 rounded-2xl border border-nature-200 shadow-sm">
            {(['poem', 'values', 'wisdom'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-2 rounded-xl text-sm font-medium transition-all capitalize",
                  activeTab === tab 
                    ? "bg-white text-nature-900 shadow-sm" 
                    : "text-nature-500 hover:text-nature-700"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </nav>

        <AnimatePresence mode="wait">
          {activeTab === 'poem' && (
            <motion.section
              key="poem"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
            >
              {/* Poem Display */}
              <div className="lg:col-span-7 space-y-8">
                <div className="glass p-8 md:p-12 rounded-[2rem] shadow-xl shadow-nature-900/5">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="font-display text-3xl font-bold text-nature-900">
                      The Hymn
                    </h2>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-nature-50 border border-nature-200 text-xs font-semibold text-nature-600 hover:bg-nature-100 transition-colors"
                        title="Copy to clipboard"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                        {copied ? "Copied" : "Copy"}
                      </button>
                      <button 
                        onClick={() => setIsEnglish(!isEnglish)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-nature-50 border border-nature-200 text-xs font-semibold text-nature-600 hover:bg-nature-100 transition-colors"
                      >
                        <Languages className="w-4 h-4" />
                        {isEnglish ? "অসমীয়া" : "English"}
                      </button>
                    </div>
                  </div>

                  <div className="font-serif text-xl md:text-2xl leading-relaxed text-nature-800 whitespace-pre-line">
                    {isEnglish ? POEM_ENGLISH : POEM_ASSAMESE}
                  </div>
                  
                  <div className="mt-12 pt-8 border-t border-nature-200 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-nature-200 flex items-center justify-center text-nature-600 font-bold">
                      MG
                    </div>
                    <div>
                      <p className="text-sm font-bold text-nature-900">Madhav Gogoi</p>
                      <p className="text-xs text-nature-500">Assam, India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-nature-900 text-white p-8 rounded-[2rem] shadow-2xl">
                  <Globe className="w-8 h-8 text-nature-400 mb-6" />
                  <h3 className="text-2xl font-display font-bold mb-4">The Universal Message</h3>
                  <p className="text-nature-300 leading-relaxed font-light">
                    This hymn is a call to all of humanity. It bridges the gap between spirituality and ecology, reminding us that our survival is inextricably linked to the health of our planet.
                  </p>
                  <ul className="mt-8 space-y-4">
                    {[
                      "Respect for all living beings",
                      "Protection of forests and rivers",
                      "Universal peace and non-violence",
                      "The sacredness of the Mother"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-nature-200">
                        <div className="w-1.5 h-1.5 rounded-full bg-nature-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-8 rounded-[2rem] border border-nature-200">
                  <h4 className="font-bold text-nature-900 mb-4">Green Wisdom</h4>
                  <p className="text-sm text-nature-600 italic">
                    "Nature is not a place to visit. It is home."
                  </p>
                </div>
              </div>
            </motion.section>
          )}

          {activeTab === 'values' && (
            <motion.section
              key="values"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {CORE_VALUES.map((value, index) => (
                <div 
                  key={index}
                  className="glass p-8 rounded-[2rem] hover:shadow-lg transition-all group border-transparent hover:border-nature-200"
                >
                  <div className="w-14 h-14 rounded-2xl bg-nature-100 flex items-center justify-center text-nature-600 mb-6 group-hover:bg-nature-600 group-hover:text-white transition-colors">
                    {value.icon === 'Heart' && <Heart />}
                    {value.icon === 'HandHeart' && <HandHeart />}
                    {value.icon === 'Sun' && <Sun />}
                    {value.icon === 'Wind' && <Wind />}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-nature-900 mb-2">{value.title}</h3>
                  <p className="text-nature-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </motion.section>
          )}

          {activeTab === 'wisdom' && (
            <motion.section
              key="wisdom"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="glass p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nature-300 via-nature-500 to-nature-300" />
                
                <Sparkles className="w-12 h-12 text-nature-400 mx-auto mb-8" />
                
                <h2 className="font-display text-4xl font-bold text-nature-900 mb-6">
                  Nature Wisdom
                </h2>
                
                <p className="text-nature-600 mb-10 max-w-lg mx-auto">
                  Receive a unique message inspired by the sacred bond between humanity and the earth.
                </p>

                <div className="min-h-[160px] flex items-center justify-center mb-10">
                  {isLoadingWisdom ? (
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-10 h-10 border-4 border-nature-200 border-t-nature-600 rounded-full animate-spin" />
                      <p className="text-xs font-medium text-nature-400 uppercase tracking-widest">Consulting the Earth...</p>
                    </div>
                  ) : wisdom ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-serif text-2xl italic text-nature-800 leading-relaxed"
                    >
                      <Markdown>{wisdom}</Markdown>
                    </motion.div>
                  ) : (
                    <p className="text-nature-400 italic">Click below to receive a message</p>
                  )}
                </div>

                <button
                  onClick={generateWisdom}
                  disabled={isLoadingWisdom}
                  className="px-10 py-4 bg-nature-900 text-white rounded-full font-bold hover:bg-nature-800 transition-all shadow-lg hover:shadow-nature-900/20 disabled:opacity-50 flex items-center gap-3 mx-auto"
                >
                  <Sparkles className="w-5 h-5" />
                  {wisdom ? "Receive Another Message" : "Get Wisdom"}
                </button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Values Banner */}
      <section className="bg-nature-100 py-24 border-y border-nature-200">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl font-bold text-nature-900 mb-16">The Path of Liberation</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Truth", icon: Sun },
              { label: "Compassion", icon: Heart },
              { label: "Peace", icon: Wind },
              { label: "Service", icon: HandHeart },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-nature-600 shadow-sm">
                  <item.icon className="w-8 h-8" />
                </div>
                <span className="font-medium text-nature-900">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-20 border-t border-nature-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <Leaf className="w-6 h-6 text-nature-600" />
                <span className="font-display text-2xl font-bold text-nature-900">Ma aru Prakriti</span>
              </div>
              <p className="text-nature-500 max-w-sm">
                Dedicated to the preservation of nature and the promotion of universal peace through the sacred teachings of Madhav Gogoi.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-4">
              <p className="text-sm font-bold text-nature-900 uppercase tracking-widest">Madhav Gogoi</p>
              <p className="text-sm text-nature-500">Assam, India</p>
              <div className="flex gap-4 mt-4">
                <Globe className="w-5 h-5 text-nature-300 hover:text-nature-600 cursor-pointer transition-colors" />
                <Heart className="w-5 h-5 text-nature-300 hover:text-nature-600 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-nature-100 text-center text-xs text-nature-400 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Ma aru Prakriti • All Life is Sacred
          </div>
        </div>
      </footer>
    </div>
  );
}
