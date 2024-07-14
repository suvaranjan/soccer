import React, { useState } from "react";
import {
  Balance,
  FirstCard,
  PlayerStrength,
  BasicInfo,
  Logout,
  RefFee,
} from "./ProfileComponents";
import {
  BasicInfoForm,
  FirstCardForm,
  PlayerStrengthForm,
  RefFeeForm,
} from "./ProfileForms";
import useLoginUser from "../../hooks/useLoginUser";

function RenderProfile({ profileData, role }) {
  const [updateFirstCard, setUpdateFirstCard] = useState(false);
  const [updatePlayerStrength, setUpdatePlayerStrength] = useState(false);
  const [updateBasicInfo, setUpdateBasicInfo] = useState(false);
  const [updateRefFee, setUpdateRefFee] = useState(false);
  const { logoutUser } = useLoginUser();

  const togglePlayerStrength = () => {
    setUpdatePlayerStrength(!updatePlayerStrength);
  };

  const toggleBasicInfo = () => {
    setUpdateBasicInfo(!updateBasicInfo);
  };

  const toggleRefFee = () => {
    setUpdateRefFee(!updateRefFee);
  };

  const toggleFirstCard = () => {
    setUpdateFirstCard(!updateFirstCard);
  };

  return (
    <>
      {updateFirstCard ? (
        <FirstCardForm data={profileData} toggleFirstCard={toggleFirstCard} />
      ) : (
        <FirstCard playerData={profileData} toggleFirstCard={toggleFirstCard} />
      )}
      <Balance playerData={profileData} />
      {updateBasicInfo ? (
        <BasicInfoForm data={profileData} toggleBasicInfo={toggleBasicInfo} />
      ) : (
        <BasicInfo playerData={profileData} toggleBasicInfo={toggleBasicInfo} />
      )}
      {role === "player" && updatePlayerStrength && (
        <PlayerStrengthForm
          data={profileData}
          togglePlayerStrength={togglePlayerStrength}
        />
      )}

      {role === "player" && !updatePlayerStrength && (
        <PlayerStrength
          playerData={profileData}
          togglePlayerStrength={togglePlayerStrength}
        />
      )}

      {role === "referee" && !updateRefFee && (
        <RefFee playerData={profileData} toggleRefFee={toggleRefFee} />
      )}

      {role === "referee" && updateRefFee && (
        <RefFeeForm data={profileData} toggleRefFee={toggleRefFee} />
      )}
      <Logout logoutUser={logoutUser} />
    </>
  );
}

export default RenderProfile;
