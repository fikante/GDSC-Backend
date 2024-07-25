function firstFunction(callback) {
    setTimeout(() => {
        console.log('First function complete');
        callback(null, 'Data from first function');
    }, 1000);
}

function secondFunction(dataFromFirst, callback) {
    setTimeout(() => {
        console.log('Second function complete', dataFromFirst);
        callback(null, 'Data from second function');
    }, 1000);
}

function thirdFunction(dataFromSecond, callback) {
    setTimeout(() => {
        console.log('Third function complete', dataFromSecond);
        callback(null, 'Data from third function');
    }, 1000);
}

function fourthFunction(dataFromThird, callback) {
    setTimeout(() => {
        console.log('Fourth function complete', dataFromThird);
        callback(null, 'Data from fourth function');
    }, 1000);
}

firstFunction((err, result) => {
    if (err) {
        console.error(err);
        return;
    }
    secondFunction(result, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        thirdFunction(result, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            fourthFunction(result, (err, result) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('All functions complete', result);
            });
        });
    });
});
