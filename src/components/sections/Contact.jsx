import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

const Contact = () => {
  // Replace with your own access key from web3forms.com
  const WEB3FORMS_ACCESS_KEY = 'bc8afd3c-6fb3-4d71-bd11-9f2fbb8229cf';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null); // null, 'success', or 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus(null);

    const data = {
      ...formData,
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New Contact Form Submission from ${formData.name}`,
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error('Submission Error:', result);
        setStatus('error');
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      setStatus('error');
    } finally {
      setIsSending(false);
      setTimeout(() => setStatus(null), 5000); // Reset status after 5 seconds
    }
  };

  const inputVariants = {
    focus: { 
      borderColor: "#00f6ff",
      boxShadow: "0 0 0 2px rgba(0, 246, 255, 0.3)",
      scale: 1.02,
    }
  };
  
  return (
    <section id="contact" className="py-20 bg-bg-primary-dark">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-sora font-extrabold text-white mb-3">
            Get In Touch
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto">
            Have a question or a project in mind? I'd love to hear from you.
            Fill out the form below and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="bg-dark-accent/30 p-6 rounded-2xl border border-neon-cyan/20 shadow-xl shadow-black/20 space-y-5"
        >
          <motion.input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 bg-dark-accent/50 rounded-lg border border-slate-700 focus:outline-none text-white transition-all text-sm"
            variants={inputVariants}
            whileFocus="focus"
          />
          <motion.input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 bg-dark-accent/50 rounded-lg border border-slate-700 focus:outline-none text-white transition-all text-sm"
            variants={inputVariants}
            whileFocus="focus"
          />
          <motion.textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full p-3 bg-dark-accent/50 rounded-lg border border-slate-700 focus:outline-none text-white transition-all resize-none text-sm"
            variants={inputVariants}
            whileFocus="focus"
          />
          <motion.button
            type="submit"
            disabled={isSending}
            className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-indigo-700 via-blue-800 to-cyan-900 bg-[length:200%_200%] bg-[position:0%_50%] border-2 border-cyan-400/40 shadow-lg shadow-cyan-400/10 text-white tracking-wide transition-all duration-300 hover:from-indigo-600 hover:to-cyan-700 hover:shadow-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px 3px #00f6ff55', backgroundPosition: '100% 50%' }}
            whileTap={{ scale: 0.97 }}
          >
            {isSending ? (
              <>
                <Loader className="animate-spin" size={24} />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className="inline-flex items-center"
                >
                  <ArrowRight size={22} className="ml-1.5" />
                </motion.span>
              </>
            )}
          </motion.button>

          {status === 'success' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-green-400 flex items-center justify-center gap-2"
            >
              <CheckCircle size={20} />
              Message sent successfully!
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-red-400 flex items-center justify-center gap-2"
            >
              <AlertTriangle size={20} />
              Something went wrong. Please try again.
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default Contact; 