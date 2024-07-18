const setCorsHeaders = (_req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    next();
};

export default setCorsHeaders;
