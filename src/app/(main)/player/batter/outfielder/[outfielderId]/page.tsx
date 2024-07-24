import React from 'react';
import path from 'path';
import fs from 'fs';
import PlayerDetailClient from '@/components/player/PlayerDetail';
import {
  IPlayerFront,
  IPlayerBack,
  IBatterPlayerData,
  TBatterYearRecord,
  TInfielderMetric,
} from '@/types';
import { getDefaultMetric } from '@/utils/getDefaultMetric';

interface OutfielderPageProps {
  params: { outfielderId: string };
}

export async function generateStaticParams() {
  const filePath = path.join(
    process.cwd(),
    'public/data/playerFront',
    'outfielder_data.json',
  );
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const paths = jsonData.data.list.map((player: IPlayerFront) => ({
    outfielderId: player.backNum.toString(),
  }));

  return paths;
}

async function getPlayerData(
  backNum: string,
): Promise<IBatterPlayerData | null> {
  const outfielderDataPath = path.join(
    process.cwd(),
    'public/data/playerFront',
    'outfielder_data.json',
  );
  const outfielderData = JSON.parse(
    fs.readFileSync(outfielderDataPath, 'utf8'),
  );
  const playerMeta = outfielderData.data.list.find(
    (player: IPlayerFront) => player.backNum === backNum,
  );

  if (!playerMeta) {
    return null;
  }

  const filePath = path.join(
    process.cwd(),
    'public/data',
    'playerDetail/batter/outfielder',
    `${playerMeta.korName}.json`,
  );

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Cannot read player data: ${playerMeta.korName}.json`);
    return null;
  }
}
export default async function OutfielderDetail({
  params,
}: OutfielderPageProps) {
  const player = await getPlayerData(params.outfielderId);

  if (!player) {
    return <div>Player not found</div>;
  }
  const playerProfile: IPlayerBack = player.data.gameplayer;
  if (player.data.metric2023 === undefined || player.data.metric2023 === null) {
    player.data.metric2023 = getDefaultMetric('outfielder') as TInfielderMetric;
  }
  const currentMetric: TInfielderMetric = player.data
    .metric2023 as TInfielderMetric;

  const playerYearRecord: TBatterYearRecord[] = player.data.yearrecordlist;
  // 예측 API
  const predictionRes: Response = await fetch(
    `${process.env.API_URL}/predict_player_stats`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        position: 'outfielder',
        player_data: playerYearRecord,
      }),
    },
  );
  if (!predictionRes.ok) {
    console.error('Error-Failed to fetch prediction data');
    // console.log(predictionRes.statusText);
    return <div>Failed to fetch prediction data</div>;
  }
  const playerMetric: TInfielderMetric = await predictionRes.json();
  return (
    <>
      <PlayerDetailClient
        player={playerProfile}
        currentMetric={currentMetric}
        aiMetric={playerMetric}
        position="outfielder"
      />
    </>
  );
}
