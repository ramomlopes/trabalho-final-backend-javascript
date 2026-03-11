function logRequests(req, res, next) {

    const inicio = Date.now();

    const duration = Date.now() - inicio;
    const { method, originalUrl } = req;
    const date = new Date().toISOString();

    console.log(`[${date}] ${method} ${originalUrl} - (${duration}ms)`);
    
    next();
}

module.exports = logRequests;