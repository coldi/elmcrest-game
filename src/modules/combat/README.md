# Combat

The combat module is about one group fighting another group.

## How it works

Combat mode starts when one group attacks another group.<br>
Every character in both of these groups receives a combat time value (delay).<br>
The combat queue consists of all characters, ordered by their time value.

The combat cycle can be broken down in roughly 3 phases.<br>
*(Some details are left out, to make the overall process easier to understand)*

### Phase 1
The character with the lowest time value begins.<br>
Once the character has chosen a target and a skill he wants to perform,
a rollout object is created. A rollout describes the performed combat action so it can be
visualized by the UI.

### Phase 2
The UI receives the rollout and animates stuff, like character avatars and skill effects.<br>
When these animations are finished, the UI reports back to the combat module that the rollout
has been presented to the user.<br>

### Phase 3
The rollout gets removed and the time value of all characters is re-calculated.<br>
In more detail:
- The cost of the performed skill is added to the time value of the current character.
- The time value of the next character in the queue is subtracted from all characters.

So after this process the next character has a time value of 0 and is now the first character
in the queue.<br>
Now the cycle starts over at phase 1.

The battle ends when all characters of one group have been defeated.
