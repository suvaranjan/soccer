import * as Yup from 'yup';

const validation = Yup.object().shape({
    referees: Yup.array()
        .of(Yup.string().required('Referee ID is required'))
        .min(1, 'At least one referee is required')
        .required('Referee is required'),
    date: Yup.date().required('Match date is required'),
    location: Yup.string().required('Match location is required'),
    type: Yup.string().required('Match type is required'),
    field: Yup.string().required('Field is required'),
    fees: Yup.object().shape({
        titleFee: Yup.number().required('Title fee is required').min(0, 'Title fee cannot be negative'),
        joiningFee: Yup.number().required('Joining fee is required').min(0, 'Joining fee cannot be negative')
    }),
    description: Yup.string().required('Match description is required'),
    playerNeed: Yup.number().required('Player need is required').min(1, 'At least one player is needed'),
});

export default validation;
