# Tabular Q-Learning for MxN, variable strike-length, Tic-Tac-Toe

```npm run train -- --width=3 --height=3 --strikeLength=3 --append=true  --iterations=100000```

My friend Ana from my favorite coffeeshop introduced me to a variant of TicTacToe that she knew from childhood: MxN with strike-length of 3, where strikes can overlap, and such that whoever makes the most number of strikes wins.

Tried implementing a tic-tac-toe player for this variant using tabular Q-Learning which I learned from MIT's 6.86x. Well, the state-action space exploded quickly. LOL.