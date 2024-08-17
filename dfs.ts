type ActionKey = 'R' | 'D' | 'L' | 'U';
type PosKey = 'S' | 'G';
type Pos = [number, number, ActionKey | PosKey];
type GameMap = number[][];
type Visited = boolean[][];

const map: GameMap = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 1, 0, 1, 0],
  [0, 1, 0, 1, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const startPos: Pos = [1, 1, 'S'];
const goalPos: Pos = [5, 5, 'G'];
const actions: Pos[] = [
  [0, 1, 'R'],
  [1, 0, 'D'],
  [0, -1, 'L'],
  [-1, 0, 'U'],
];
const isGoal = (pos: Pos, goalPos: Pos) =>
  pos[0] === goalPos[0] && pos[1] === goalPos[1];
const isWall = (map: GameMap, pos: Pos) => map[pos[0]][pos[1]] === 0;
const isVisited = (visited: Visited, pos: Pos) => visited[pos[0]][pos[1]];
const isValidPos = (map: GameMap, pos: Pos) => {
  const [x, y] = pos;
  return x >= 0 && x < map.length && y >= 0 && y < map[0].length;
};

const dfs_routes_start_to_goal = (
  map: GameMap,
  startPos: Pos,
  goalPos: Pos
) => {
  const visited: Visited = map.map(row => row.map(() => false));
  const route: Pos[] = [];
  const dfs = (pos: Pos) => {
    if (isGoal(pos, goalPos)) {
      route.push(pos);
      return true;
    }
    visited[pos[0]][pos[1]] = true;
    for (const action of actions) {
      const nextPos: Pos = [pos[0] + action[0], pos[1] + action[1], action[2]];
      if (
        isValidPos(map, nextPos) &&
        !isWall(map, nextPos) &&
        !isVisited(visited, nextPos)
      ) {
        route.push(pos);
        if (dfs(nextPos)) {
          return true;
        }
        route.pop();
      }
    }
    return false;
  };
  dfs(startPos);
  return route;
};

console.log(dfs_routes_start_to_goal(map, startPos, goalPos));
