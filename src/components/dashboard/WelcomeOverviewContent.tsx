
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

export const WelcomeOverviewContent: React.FC = () => {
  const { t, language } = useTranslation();

  if (language === 'es') {
    return (
      <div className="space-y-6">
        <div className="glass-card rounded-2xl p-8 text-white border-fuchsia-500/20 bg-[#7a0486]">
          <div className="space-y-6 text-lg leading-relaxed">
            <p className="my-[9px] text-lg">
              {t('welcomeContent.dearHotelPartner')}<br />
              {t('welcomeContent.giveUsRooms')}
            </p>
            
            <p className="text-lg">
              {t('welcomeContent.imagineHotelFull')}<br />
              {t('welcomeContent.noMoreEmptyNights')}<br />
              {t('welcomeContent.noMoreUnpredictableSeasons')}<br />
              {t('welcomeContent.noMoreLastMinuteDiscounts')}<br />
              {t('welcomeContent.fullOccupancy')}
            </p>
            
            <p className="text-lg">
              {t('welcomeContent.butThatsNotAll')}<br />
              {t('welcomeContent.withHotelLiving')}<br />
              {t('welcomeContent.fewerCleanings')}<br />
              {t('welcomeContent.lessLaundry')}<br />
              {t('welcomeContent.fewerTransitions')}<br />
              {t('welcomeContent.predictableWorkloads')}<br />
              {t('welcomeContent.stableStaff')}<br />
              {t('welcomeContent.reduceCosts')}
            </p>
            
            <p className="text-lg">
              {t('welcomeContent.eliminateChaos')}<br />
              {t('welcomeContent.bringCalm')}
            </p>
            
            <p className="text-lg">
              {t('welcomeContent.whoAreGuests')}<br />
              {t('welcomeContent.professionals')}<br />
              {t('welcomeContent.remoteWorkers')}<br />
              {t('welcomeContent.activeRetirees')}<br />
              {t('welcomeContent.peopleWantComfort')}<br />
              {t('welcomeContent.notQuickStays')}
            </p>
            
            <p className="text-lg">
              {t('welcomeContent.theyStayBelong')}
            </p>
            
            <p className="text-lg">
              {t('welcomeContent.buildingCommunities')}<br />
              {t('welcomeContent.sharedInterests')}<br />
              {t('welcomeContent.themedActivities')}<br />
              {t('welcomeContent.socialBonds')}<br />
              {t('welcomeContent.longTermLoyalty')}
            </p>
            
            <p className="text-lg">
              {t('welcomeContent.affinityHotels')}<br />
              {t('welcomeContent.guestsStayLonger')}
            </p>
            
            <p className="text-lg">
              {t('welcomeContent.whileRentals')}<br />
              {t('welcomeContent.bringCustomersBack')}
            </p>
            
            <p className="text-lg">
              {t('welcomeContent.simpleSystem')}<br />
              {t('welcomeContent.singleCheckinDay')}<br />
              {t('welcomeContent.smoothOperation')}<br />
              {t('welcomeContent.highSeasonAllYear')}<br />
              {t('welcomeContent.maximumProfitability')}
            </p>
            
            <p className="text-lg">
              {t('welcomeContent.notJustAnotherModel')}<br />
              {t('welcomeContent.futureOfManagement')}
            </p>
            
            <p className="text-lg">
              {t('welcomeContent.lessStress')}<br />
              {t('welcomeContent.moreRevenue')}<br />
              {t('welcomeContent.stableTeams')}<br />
              {t('welcomeContent.happyGuests')}<br />
              {t('welcomeContent.hotelsWinning')}
            </p>
            
            <p className="text-base">
              <strong className="rounded-full">{t('welcomeContent.fillRooms')}<br />
              {t('welcomeContent.takeControl')}</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-8 text-white border-fuchsia-500/20 bg-[#7a0486]">
        <div className="space-y-6 text-lg leading-relaxed">
          <p className="my-[9px] text-lg">
            🤝 <strong className="py-[6px] my-[11px]">Dear Hotel Partner,</strong><br />
            👉 Give us your empty rooms… and we'll turn them into gold.
          </p>
          
          <p className="text-lg">
            🏨 <strong>IMAGINE YOUR HOTEL FULL. EVERY SINGLE DAY. ALL YEAR LONG.</strong><br />
            ✅ 🛏️ No more empty nights<br />
            ✅ 📆 No more unpredictable seasons<br />
            ✅ 💸 No more last-minute discounts to fill gaps<br />
            ✅ 🎯 100% OCCUPANCY — 365 DAYS A YEAR
          </p>
          
          <p className="text-lg">
            🚀 <strong>BUT THAT'S NOT ALL</strong><br />
            With Hotel-Living:<br />
            ✅ 🧹 Fewer cleanings<br />
            ✅ 🧺 Less laundry<br />
            ✅ 🔄 Fewer transitions<br />
            ✅ 👨‍💼 Predictable workloads for your front desk<br />
            ✅ 👥 Stable, motivated staff — trained, professional, loyal<br />
            ✅ 📉 You cut your operational costs dramatically
          </p>
          
          <p className="text-lg">
            👉 We eliminate the chaos of constant check-ins and check-outs.<br />
            👉 We bring calm, consistency, and control to your operations.
          </p>
          
          <p className="text-lg">
            🧑‍💻 <strong>AND WHO ARE YOUR GUESTS?</strong><br />
            👩‍💼 Professionals<br />
            🌐 Remote workers<br />
            🧓 Active retirees<br />
            🏡 People who want comfort, stability, and respect —<br />
            🙌 Not quick stays — but real living
          </p>
          
          <p className="text-lg">
            They don't come and go — they stay, they belong, they return.
          </p>
          
          <p className="text-lg">
            🌱 <strong>WE'RE NOT FILLING ROOMS WITH TOURISTS. WE'RE BUILDING COMMUNITIES</strong><br />
            🤝 Shared interests<br />
            🎯 Themed activities<br />
            🔗 Social bonds<br />
            🔄 Long-term loyalty
          </p>
          
          <p className="text-lg">
            👉 🏨 Affinity hotels become social networks<br />
            👉 🔄 Your guests stay longer, come back more often, and spend more — happily.
          </p>
          
          <p className="text-lg">
            🏠 <strong>AND WHILE RENTAL APARTMENTS ARE FIGHTING FOR SCRAPS…</strong><br />
            👉 We bring your customers back to where they belong: TO YOU.
          </p>
          
          <p className="text-lg">
            🎯 <strong>ONE SIMPLE, POWERFUL SYSTEM</strong><br />
            🗓️ One single check-in day per week<br />
            🔄 One smooth, simple, highly efficient operation<br />
            🌞 High season — all year long<br />
            💰 Maximum profitability — with lower costs
          </p>
          
          <p className="text-lg">
            🚀 <strong>THIS IS NOT JUST ANOTHER BUSINESS MODEL</strong><br />
            🔥 <strong>THIS IS THE FUTURE OF HOTEL MANAGEMENT</strong> 🔥
          </p>
          
          <p className="text-lg">
            😌 Less stress<br />
            📈 More revenue<br />
            👥 Stable teams<br />
            😊 Happy guests<br />
            🏆 And above all: Hotels winning again
          </p>
          
          <p className="text-base">
            💡 <strong className="rounded-full">Let's fill your rooms. Let's boost your profits.<br />
            Let's take back control — and build something extraordinary.</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
