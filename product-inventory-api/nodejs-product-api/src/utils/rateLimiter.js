const rateLimit = (limit, windowMs) => {
    const requests = new Map();

    return (req, res, next) => {
        const ip = req.socket.remoteAddress;

        if (!requests.has(ip)) {
            requests.set(ip, { count: 1, firstRequestTime: Date.now() });
        } else {
            const requestInfo = requests.get(ip);
            const currentTime = Date.now();

            if (currentTime - requestInfo.firstRequestTime < windowMs) {
                requestInfo.count += 1;

                if (requestInfo.count > limit) {
                    return res.status(429).json({ error: 'Too many requests, please try again later.' });
                }
            } else {
                requestInfo.count = 1;
                requestInfo.firstRequestTime = currentTime;
            }
        }

        next();
    };
};

module.exports = rateLimit;