import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Team name is required'),
    // avatar: Yup.string().required('Team avatar is required'),
    description: Yup.string().required('Team description is required'),
    coach: Yup.object().shape({
        name: Yup.string().required('Coach name is required'),
        // avatar: Yup.string().required('Coach avatar is required'),
        address: Yup.string().required('Coach address is required'),
    }),
    bankInfo: Yup.object().shape({
        paynowNumber: Yup.string().required('PayNow number is required'),
        bankCardNumber: Yup.string().required('Bank card number is required'),
        bankNumber: Yup.string().required('Bank number is required'),
    }),
    sponsor: Yup.object().shape({
        name: Yup.string().required('Sponsor name is required'),
        contact: Yup.string().required('Sponsor contact information is required'),
        amount: Yup.string().required('Sponsorship amount is required'),
        period: Yup.string().required('Sponsorship period is required'),
    }),
});

export default validationSchema;
