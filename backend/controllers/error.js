export const getErrorPage = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }
    res.status(404).json({ message: "404 - Not Found" });
};
