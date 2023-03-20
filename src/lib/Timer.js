function executionTime(fn) {
    return function (...args) {
        const start = performance.now();
        const result = fn.apply(this, args);
        const end = performance.now();
        // console.log(`${fn.name} took ${end - start} ms`);
        return { result, time: `${end - start} ms` };
    }
}

export default executionTime;