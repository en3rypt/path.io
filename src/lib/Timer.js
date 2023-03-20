function executionTime(fn) {
    return async function (...args) {
        const start = performance.now();
        const result = await fn.apply(this, args);
        const end = performance.now();
        // console.log(`${fn.name} took ${end - start} ms`);
        const time = end - start;
        return { result, time: time };
    }
}

export default executionTime;