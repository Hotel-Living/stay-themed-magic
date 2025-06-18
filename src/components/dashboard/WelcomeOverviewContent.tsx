
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

export const WelcomeOverviewContent: React.FC = () => {
  const { t } = useTranslation();

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
};
