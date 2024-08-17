import { useGetAllMedicalReqUsersQuery } from "@/redux/apis/medical_req/medicalReqApi";
import { RequirementTypeEnum } from "@/../../api/src/medical_req/enums/requirement_type.enum";
import { RequirementStatusEnum } from "@/../../api/src/medical_req/enums/requirement_status.enum";
import { UserRolType } from "../../../../../../api/src/utils/enums/user_roles.enum";

export const useMedicalReqData = () => {
  const { data: allMedicalReqData } = useGetAllMedicalReqUsersQuery({});

  return { allMedicalReqData };
};

export const useMedicalReqByDate = (
  year: number | null,
  month: number | null
) => {
  const {
    data: filterMedicalReqByDate,
    refetch: refetchFilterMedicalReqByDate,
  } = useGetAllMedicalReqUsersQuery({
    year,
    month,
  });

  return { filterMedicalReqByDate, refetchFilterMedicalReqByDate };
};

export const useMedicalReqDataByType = () => {
  const { data: clinicHistoryData } = useGetAllMedicalReqUsersQuery({
    type: RequirementTypeEnum.CLINIC_HISTORY,
  });
  const { data: medicalDisabilityData } = useGetAllMedicalReqUsersQuery({
    type: RequirementTypeEnum.MEDICAL_DISABILITY,
  });
  const { data: medicalOrderData } = useGetAllMedicalReqUsersQuery({
    type: RequirementTypeEnum.MEDICAL_ORDER,
  });

  return { clinicHistoryData, medicalDisabilityData, medicalOrderData };
};

export const useMedicalReqDataByStatus = () => {
  const { data: createdData } = useGetAllMedicalReqUsersQuery({
    status: RequirementStatusEnum.CREATED,
  });
  const { data: visualizedData } = useGetAllMedicalReqUsersQuery({
    status: RequirementStatusEnum.VISUALIZED,
  });
  const { data: underReviewData } = useGetAllMedicalReqUsersQuery({
    status: RequirementStatusEnum.UNDER_REVIEW,
  });
  const { data: deliveredData } = useGetAllMedicalReqUsersQuery({
    status: RequirementStatusEnum.DELIVERED,
  });
  const { data: rejectedData } = useGetAllMedicalReqUsersQuery({
    status: RequirementStatusEnum.REJECTED,
  });
  const { data: expiredData } = useGetAllMedicalReqUsersQuery({
    status: RequirementStatusEnum.EXPIRED,
  });

  return {
    createdData,
    visualizedData,
    underReviewData,
    deliveredData,
    rejectedData,
    expiredData,
  };
};

export const useMedicalReqDataByApplicantType = () => {
  const { data: patientData } = useGetAllMedicalReqUsersQuery({
    aplicantType: UserRolType.PATIENT,
  });
  const { data: epsData } = useGetAllMedicalReqUsersQuery({
    aplicantType: UserRolType.EPS,
  });
  const { data: familiarData } = useGetAllMedicalReqUsersQuery({
    aplicantType: UserRolType.AUTHORIZED_FAMILIAR,
  });

  return { patientData, epsData, familiarData };
};
