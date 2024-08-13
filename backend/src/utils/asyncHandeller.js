const asyncHandaller = (requestHandeller) => {
   return (req, res, next) => {
      Promise.resolve(requestHandeller(req, res, next)).catch((error) =>
         next(error)
      );
   };
};

export { asyncHandaller };

/*
const asyncHandaller = (fn) => {};
const asyncHandaller = (fn) => () => {};
const asyncHandaller = (fn) => async () => {};

const asyncHandaller = (fn) => async (req, res, next) => {
   try {
      await fn(req, res, next);
   } catch (error) {
      res.status(error.code || 500).json({
         sucess: false,
         message: error.message,
      });
   }
};


*/
