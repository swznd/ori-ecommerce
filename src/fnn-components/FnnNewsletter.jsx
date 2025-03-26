import { useState } from 'react';

function FnnNewsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Biar form gak reload page

    // Cek valid gak email-nya
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setSubmitted(false);
      return;
    }

    // Kalau valid:
    setError('');
    setSubmitted(true);
    console.log('Submitted email:', email); // nanti bisa diganti dengan API call
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-box bg-secondary/10 flex w-full flex-col items-center justify-center gap-6 px-6 py-14 text-center"
    >
      {/* Heading */}
      <div className="flex max-w-xl flex-col items-center gap-4">
        <h2 className="text-neutral text-3xl">
          Daily Fabric Trends newsletter
        </h2>
        <p className="text-neutral text-base">
          Get updates on what’s trending delivered to your mailbox
        </p>
      </div>

      {/* Input */}
      <div className="w-full max-w-sm">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-md w-full"
        />
        {error && <p className="text-warning mt-2 text-sm">{error}</p>}
        {submitted && !error && (
          <p className="text-success mt-2 text-sm">You're subscribed! ✅</p>
        )}
      </div>

      {/* Privacy & Button */}
      <div className="flex w-full max-w-2xl flex-col items-center justify-between gap-4 md:flex-row md:text-left">
        <p className="text-sm text-neutral-500">
          Your information will be used in accordance with Google's privacy
          policy. You can unsubscribe at any time.
        </p>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
    </form>
  );
}

export default FnnNewsletter;
