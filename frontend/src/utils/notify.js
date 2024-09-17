import toast from 'react-hot-toast';

const notify = (message, type = 'error', duration = 10000) => {
  const toastOptions = { duration };

  switch (type) {
    case 'success': 
      toast.success(message, toastOptions);
      break;
    case 'error':
      toast.error(message, toastOptions);
      break;
    case 'info':
      toast(message, toastOptions);
      break;
    default:
      toast(message, toastOptions);
      break;
  }
};

export default notify;