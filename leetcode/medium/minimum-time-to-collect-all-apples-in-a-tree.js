// https://leetcode.com/problems/minimum-time-to-collect-all-apples-in-a-tree/

const n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], hasApple = [false,false,true,false,true,true,false]

// my solution is the best by performance!
// Runtime
// 107 ms
// Beats
// 100%
// Memory
// 59.9 MB
// Beats
// 100%
const minTime = (n, edges, hasApple) => {
    let result = 0
    const nodes = {}
    const increaseResult = i => {
        const next = nodes[i]
        if (next !== undefined) {
            result++
            delete nodes[i]
            if (next !== 0) increaseResult(next)
        }
    }
    for (let i = 0; i < n - 1; i ++) {
        const edge = edges[i]
        if (hasApple[edge[1]]) {
            result++
            increaseResult(edge[0])
        } else if (hasApple[edge[0]] && nodes[edge[1]] !== undefined) {
            result++
            increaseResult(edge[1])
        } else nodes[edge[1]] = edge[0]
    }

    return result * 2
};

console.log(minTime(n, edges, hasApple))


// it solves the problem, but isn't valid solution because gets timeout error on large numbers
const minTime1 = (n, edges, hasApple) => {
    const nodes = edges.reduce((acc, node) => ({...acc, [node[1]]: node[0]}), {0: -1})
    let result = 0
    const goToReached = i => {
        const next = nodes[i]
        if (nodes[i] === -1) return
        result++
        nodes[i] = -1
        goToReached(next)
    }
    hasApple.forEach((v, i) => {if (v) goToReached(i)})

    return result * 2
};