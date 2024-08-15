const CODE_KEY = 'captureCode';

function generateCaptureCode(length = 6) {
   if (typeof length !== 'number' || length <= 0) {
      throw new Error('Invalid length. Length must be a positive number.');
   }

   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   let result = '';
   const charactersLength = characters.length;

   for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters[randomIndex];
   }

   try {
      localStorage.setItem(CODE_KEY, result);
   } catch (e) {
      console.error('Failed to store the capture code in localStorage:', e);
      throw new Error('Unable to store the capture code.');
   }

   return result;
}

function verifyCaptureCode(inputCode) {
   if (typeof inputCode !== 'string') {
      throw new Error('Invalid input. Input code must be a string.');
   }

   let storedCode;
   try {
      storedCode = localStorage.getItem(CODE_KEY);
   } catch (e) {
      console.error('Failed to retrieve the capture code from localStorage:', e);
      throw new Error('Unable to retrieve the capture code.');
   }

   const isValid = inputCode === storedCode;

   try {
      localStorage.removeItem(CODE_KEY);
   } catch (e) {
      console.error('Failed to remove the capture code from localStorage:', e);
   }

   return isValid;
}

export { generateCaptureCode, verifyCaptureCode };
