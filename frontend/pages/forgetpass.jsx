import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useRouter } from 'next/router';


const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [successOtp, setSuccessOtp] = useState(false);
  const [successPass, setSuccessPass] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();


  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    router.push('/login'); // Redirect to the login page after closing the modal
  };

  const notifySuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  const notifyError = (message) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 5000);
  };

  const sendForgetPasswordRequest = async () => {
    try {
      await axios.post('http://localhost:3000/administrator/forgetpass', { Email: email }, { withCredentials: true });
      notifySuccess('Reset email sent. Check your email for further instructions.');
      setSuccessOtp(true); // Set the state to display OTP form
    } catch (error) {
      notifyError('Email not found');
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post('http://localhost:3000/administrator/forgetpassverify', { otp }, { withCredentials: true });
      notifySuccess('OTP successfully verified.');
      setError('');
      setSuccessOtp(false); // Move to the next step (changing password)
      setSuccessPass(true);
    } catch (error) {
      setError('Invalid OTP');
    }
  };

  const changePassword = async () => {
    try {
      await axios.patch(
        'http://localhost:3000/administrator/forgetpasschange',
        { Password: newPassword, ConfirmPassword: confirmPassword },
        { withCredentials: true }
      );
      notifySuccess('Password changed successfully. You can now log in with your new password.');
      setSuccessPass(true);
      openModal();
    } catch (error) {
      setError('Password change failed');
    }
  };

  const isPasswordValid = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(newPassword);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Forget Password</h2>

      {!successOtp && !successPass && (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input mt-1 block w-full"
            />
          </div>

          <div className="mb-4">
            <button
              onClick={sendForgetPasswordRequest}
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
              Send Reset Email
            </button>
          </div>
        </div>
      )}

      {successOtp && (
        <div>
          <label className="block text-sm font-medium text-gray-600">OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="form-input mt-1 block w-full"
          />
          <button onClick={verifyOtp} className="mt-2 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded">
            Verify OTP
          </button>
        </div>
      )}

      {!successOtp && successPass && (
        <div>
          <label className="block text-sm font-medium text-gray-600">New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`form-input mt-1 block w-full ${
              isPasswordValid() ? 'border-green-500' : 'border-red-500'
            }`}
          />
          <small className="text-sm text-gray-500 mt-2">
            Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one
            number, and one special character.
          </small>

          <label className="block text-sm font-medium text-gray-600 mt-2">Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`form-input mt-1 block w-full ${
              confirmPassword === newPassword ? 'border-green-500' : 'border-red-500'
            }`}
          />

          <button
            onClick={changePassword}
            className="mt-4 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded"
            disabled={!isPasswordValid() || confirmPassword !== newPassword}
          >
            Change Password
          </button>
        </div>
      )}

      {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Success Message"
  className="absolute inset-1/4 p-8 mx-auto my-20 w-96 bg-white border border-gray-300 rounded-md shadow-lg"
  overlayClassName="fixed inset-0 bg-black opacity-100"
  ariaHideApp={false} // Fix for accessibility
>
  <h2 className="text-2xl font-bold mb-4 text-green-500">Success</h2>
  <p className="text-gray-700">{successMessage}</p>
  <button
    onClick={closeModal}
    className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
  >
    Close
  </button>
</Modal>
    </div>
  );
};

export default ForgetPassword;
