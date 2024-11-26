const express = require('express');
const { Types } = require('mongoose');

const preventNoSQLInjection = (req, res, next) => {
    const isObject = obj => obj && typeof obj === 'object' && !Array.isArray(obj);
    
    const sanitize = input => {
        // Handle null or undefined inputs
        if (input === null || input === undefined) {
            return input;
        }

        // Deep recursive sanitization
        if (isObject(input)) {
            const sanitizedObj = {};
            for (const key in input) {
                if (input.hasOwnProperty(key)) {
                    // Block known dangerous MongoDB query operators
                    if (key.startsWith('$')) {
                        return null; // Remove entire object with dangerous operators
                    }
                    sanitizedObj[key] = sanitize(input[key]);
                }
            }
            return sanitizedObj;
        }

        // Handle arrays 
        if (Array.isArray(input)) {
            return input.map(sanitize).filter(item => item !== null);
        }

        // String sanitization with more comprehensive filtering
        if (typeof input === 'string') {
            // Remove potentially dangerous MongoDB query operators and patterns
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

            // Trim and remove excessive whitespace
            return sanitizedInput.trim().replace(/\s+/g, ' ');
        }

        return input;
    };

    // Validate and sanitize different request parts
    const sanitizeRequestPart = (part) => {
        try {
            // Validate ObjectId if it looks like a MongoDB ID
            if (typeof part === 'string' && part.length === 24 && /^[0-9a-fA-F]+$/.test(part)) {
                // Ensure it's a valid MongoDB ObjectId
                Types.ObjectId(part);
            }
            return sanitize(part);
        } catch (error) {
            // If ObjectId validation fails, return null
            return null;
        }
    };

    // Apply sanitization to request parts
    req.body = sanitizeRequestPart(req.body) || {};
    req.query = sanitizeRequestPart(req.query) || {};
    req.params = sanitizeRequestPart(req.params) || {};

    next();
};

module.exports = preventNoSQLInjection;