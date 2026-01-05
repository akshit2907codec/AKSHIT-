
import React, { useState, useMemo } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import LearnTracks from './components/LearnTracks';
import GuildBoard from './components/GuildBoard';
import AIMentor from './components/AIMentor';
import DailyMissions from './components/DailyMissions';
import { MOCK_USER_STATS, GUILDS, SKILLS, DAILY_MISSIONS } from './constants';
import { Guild, UserRank, UserStats, DailyMission, StudyTask } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userStats, setUserStats] = useState<UserStats>(MOCK_USER_STATS);
  const [guildList, setGuildList] = useState<Guild[]>(GUILDS);
  const [dailyMissions, setDailyMissions] = useState<DailyMission[]>(DAILY_MISSIONS);
  const [studyTasks, setStudyTasks] = useState<StudyTask[]>([
    { id: '1', text: 'Review Binary Search O(log n) logic', isCompleted: false },
    { id: '2', text: 'Complete Python Decorators Module', isCompleted: true },
    { id: '3', text: 'Initiate C++ Pointer Manifest', isCompleted: false }
  ]);

  // Dynamic Rank Calculation based on specific user thresholds
  const currentUserStats = useMemo(() => {
    const { xp } = userStats;
    let rank = UserRank.BRONZE;
    let level = Math.floor(xp / 100) + 1;

    if (xp >= 1100) rank = UserRank.PLATINUM;
    else if (xp >= 600) rank = UserRank.GOLD;
    else if (xp >= 300) rank = UserRank.SILVER;
    else if (xp >= 100) rank = UserRank.BRONZE;

    return { ...userStats, rank, level };
  }, [userStats.xp]);

  const handleEnroll = (skillId: string) => {
    if (!userStats.enrolledSkillIds.includes(skillId)) {
      setUserStats(prev => ({
        ...prev,
        xp: prev.xp + 800,
        points: prev.points + 200,
        enrolledSkillIds: [...prev.enrolledSkillIds, skillId]
      }));
      setActiveTab('dashboard');
    } else {
      setActiveTab('dashboard');
    }
  };

  const handleMissionSuccess = (xpReward: number, pointsReward: number) => {
    setUserStats(prev => ({
      ...prev,
      xp: prev.xp + xpReward,
      points: prev.points + pointsReward,
      streak: prev.streak + 1
    }));
  };

  const handleMentorUse = () => {
    setUserStats(prev => ({
      ...prev,
      xp: prev.xp + 2 
    }));
  };

  const handleCompleteDailyMission = (missionId: string) => {
    const mission = dailyMissions.find(m => m.id === missionId);
    if (mission && !mission.isCompleted) {
      setDailyMissions(prev => prev.map(m => m.id === missionId ? { ...m, isCompleted: true } : m));
      handleMissionSuccess(mission.rewardXp, 50);
    }
  };

  const handleCreateGuild = (name: string, tag: string) => {
    const newGuild: Guild = {
      id: Date.now().toString(),
      name,
      tag,
      rank: guildList.length + 1,
      members: 1,
      exp: 0
    };
    setGuildList(prev => [...prev, newGuild]);
    setUserStats(prev => ({ ...prev, xp: prev.xp + 1500 }));
  };

  // Study To-Do Handlers
  const addTask = (text: string) => {
    const newTask: StudyTask = {
      id: Date.now().toString(),
      text,
      isCompleted: false
    };
    setStudyTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setStudyTasks(prev => prev.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  const deleteTask = (id: string) => {
    setStudyTasks(prev => prev.filter(t => t.id !== id));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            enrolledIds={currentUserStats.enrolledSkillIds} 
            userStats={currentUserStats} 
            studyTasks={studyTasks}
            onToggleTask={toggleTask}
            onAddTask={addTask}
          />
        );
      case 'learn':
        return (
          <LearnTracks 
            enrolledIds={currentUserStats.enrolledSkillIds} 
            onEnroll={handleEnroll} 
            studyTasks={studyTasks}
            onAddTask={addTask}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
          />
        );
      case 'missions':
        return <DailyMissions missions={dailyMissions} onComplete={handleCompleteDailyMission} />;
      case 'guilds':
        return (
          <GuildBoard 
            guilds={guildList} 
            onCreateGuild={handleCreateGuild} 
            onMissionSuccess={handleMissionSuccess}
          />
        );
      case 'mentor':
        return <AIMentor onMentorUse={handleMentorUse} />;
      default:
        return (
          <Dashboard 
            enrolledIds={currentUserStats.enrolledSkillIds} 
            userStats={currentUserStats} 
          />
        );
    }
  };

  return (
    <Layout 
      userStats={currentUserStats} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
    >
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
