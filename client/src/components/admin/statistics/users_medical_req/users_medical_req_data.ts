import {
  useGetAllMedicalReqUsersQuery,
  useGetAverageResponseTimeQuery,
} from "@/redux/apis/medical_req/medicalReqApi";
import { RequirementTypeEnum } from "@/../../api/src/medical_req/enums/requirement_type.enum";
import { RequirementStatusEnum } from "@/../../api/src/medical_req/enums/requirement_status.enum";
import { UserRolType } from "../../../../../../api/src/utils/enums/user_roles.enum";

export const useMedicalReqData = (year?: number, month?: number) => {
  const { data: allMedicalReqData } = useGetAllMedicalReqUsersQuery({
    year,
    month,
  });

  return { allMedicalReqData };
};

export const useMedicalReqDataByType = (year?: number, month?: number) => {
  const { data: clinicHistoryData } = useGetAllMedicalReqUsersQuery({
    type: RequirementTypeEnum.CLINIC_HISTORY,
    year,
    month,
  });
  const { data: medicalDisabilityData } = useGetAllMedicalReqUsersQuery({
    type: RequirementTypeEnum.MEDICAL_DISABILITY,
    year,
    month,
  });
  const { data: medicalOrderData } = useGetAllMedicalReqUsersQuery({
    type: RequirementTypeEnum.MEDICAL_ORDER,
    year,
    month,
  });

  return { clinicHistoryData, medicalDisabilityData, medicalOrderData };
};

export const useMedicalReqDataByStatus = (year?: number, month?: number) => {
  const { data: createdData } = useGetAllMedicalReqUsersQuery({
    status: RequirementStatusEnum.CREATED,
    year,
    month,
  });
  const { data: visualizedData } = useGetAllMedicalReqUsersQuery({
    status: RequirementStatusEnum.VISUALIZED,
    year,
    month,
  });
  const { data: underReviewData } = useGetAllMedicalReqUsersQuery({
    status: RequirementStatusEnum.UNDER_REVIEW,
    year,
    month,
  });
  const { data: deliveredData } = useGetAllMedicalReqUsersQuery({
    status: RequirementStatusEnum.DELIVERED,
    year,
    month,
  });
  const { data: rejectedData } = useGetAllMedicalReqUsersQuery({
    status: RequirementStatusEnum.REJECTED,
    year,
    month,
  });
  const { data: expiredData } = useGetAllMedicalReqUsersQuery({
    status: RequirementStatusEnum.EXPIRED,
    year,
    month,
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

export const useMedicalReqDataByApplicantType = (
  year?: number,
  month?: number
) => {
  const { data: patientData } = useGetAllMedicalReqUsersQuery({
    aplicantType: UserRolType.PATIENT,
    year,
    month,
  });
  const { data: epsData } = useGetAllMedicalReqUsersQuery({
    aplicantType: UserRolType.EPS,
    year,
    month,
  });
  const { data: familiarData } = useGetAllMedicalReqUsersQuery({
    aplicantType: UserRolType.AUTHORIZED_FAMILIAR,
    year,
    month,
  });

  return { patientData, epsData, familiarData };
};

export const useGetAverageResponseTimeData = () => {
  const { data: averageResponseTime } = useGetAverageResponseTimeQuery(null);

  return { averageResponseTime };
};
