const express = require('express');
const { Types } = require('mongoose');

const preventNoSQLInjection = (req, res, next) => {
    const isObject = obj => obj && typeof obj === 'object' && !Array.isArray(obj);
    
    const sanitize = input => {
        if (input === null || input === undefined) {
            return input;
        }
        if (isObject(input)) {
            const sanitizedObj = {};
            for (const key in input) {
                if (input.hasOwnProperty(key)) {
                    if (key.startsWith('$')) {
                        return null;
                    }
                    sanitizedObj[key] = sanitize(input[key]);
                }
            }
            return sanitizedObj;
        }

        if (Array.isArray(input)) {
            return input.map(sanitize).filter(item => item !== null);
        }

        if (typeof input === 'string') {
            const dangerousPatterns = [
                /\$where/gi,
                /\$ne/gi,
                /\$gt/gi,
                /\$lt/gi,
                /\$in/gi,
                /\$or/gi,
                /\$and/gi,
                /\$regex/gi,
                /sleep\([^)]*\)/gi,
                /return/gi,
                /\b(eval|Function)\s*\(/gi,
                /javascript:/gi,
                /\b(delete|drop)\s+/gi
            ];

            let sanitizedInput = input;
            dangerousPatterns.forEach(pattern => {
                sanitizedInput = sanitizedInput.replace(pattern, '');
            });

            return sanitizedInput.trim().replace(/\s+/g, ' ');
        }

        return input;
    };

    const sanitizeRequestPart = (part) => {
        try {
            if (typeof part === 'string' && part.length === 24 && /^[0-9a-fA-F]+$/.test(part)) {
                Types.ObjectId(part);
            }
            return sanitize(part);
        } catch (error) {
            return null;
        }
    };

    req.body = sanitizeRequestPart(req.body) || {};
    req.query = sanitizeRequestPart(req.query) || {};
    req.params = sanitizeRequestPart(req.params) || {};

    next();
};

module.exports = preventNoSQLInjection;