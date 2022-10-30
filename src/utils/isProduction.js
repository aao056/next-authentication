export default function isProduction() {
    return process.env.NODE_ENV === 'production' || process.env.FORCE_PRODUCTION
}