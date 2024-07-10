import * as Yup from 'yup';

const validation = Yup.object().shape({
    name: Yup.string().required('League name is required'),
    description: Yup.string().required('League description is required'),
    photo: Yup.string().required('League photo is required'),
    date: Yup.date().required('Date is required').min(new Date(), 'Date must be in the future'),
    time: Yup.string().required('Time is required'),
    venue: Yup.string().required('Venue is required'),
    maxTeams: Yup.number().required('Max teams is required').min(1, 'Must be at least 1'),
    diamondLevel: Yup.number().required('Diamond level is required').min(0, 'Must be at least 0'),
    zgoldLevel: Yup.number().required('Zgold level is required').min(0, 'Must be at least 0'),
    deposit: Yup.number().required('Deposit is required').min(0, 'Must be at least 0'),
    public: Yup.boolean(),
    private: Yup.boolean(),
});

export default validation;
