import { updateUserScore } from './Client';
import {
  sendAnalyticsGameStartEvent,
  sendAnalyticsRoundFinishEvent,
  sendAnalyticsRoundStartEvent,
} from './Analytics';
import { v4 } from 'uuid';
import { controller } from './Controller';
import { Sounds } from './Sounds';
import {
  showGameLayout,
  showScoreLayout,
  showStartMenuLayout,
} from '../layout';
import { context } from '../../include/engine';

export function entryPoint() {
  navigateStartMenuPage();
  sendAnalyticsGameStartEvent(); // analytics
}

export function navigateStartMenuPage() {
  controller.isGame = false;
  showStartMenuLayout();
  Sounds.updateSoundMenuSoundtrack();
}

export function navigateGamePage() {
  controller.isGame = true;
  controller.user.roundId = v4();
  showGameLayout();
  Sounds.stopSoundMenuSoundtrack();
  sendAnalyticsRoundStartEvent(); // analytics
}

export async function navigateScorePage(
  collisions: number,
  end_zone: number,
  round_time: number,
  roundScore: number
) {
  controller.isGame = false;
  controller.user = await updateUserScore(roundScore);
  showScoreLayout(roundScore);
  context.playdeck.setScore(roundScore);
  sendAnalyticsRoundFinishEvent(
    collisions,
    end_zone,
    'loose',
    round_time,
    roundScore
  ); // analytics
}
