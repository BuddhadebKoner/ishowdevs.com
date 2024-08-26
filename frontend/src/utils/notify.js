import toast from 'react-hot-toast';

const notify = (message, type = 'error') => {
  switch (type) {
    case 'success':
      toast.success(message, {
        duration: 10000,
      });
      break;
    case 'error':
      toast.error(message, {
        duration: 10000,
      });
      break;
    case 'loading':
      toast.loading(message, {
        duration: Infinity,
      });
      break;
    default:
      toast(message, {
        duration: 10000,
      });
  }
};

export default notify;
