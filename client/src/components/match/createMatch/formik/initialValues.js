const initialValues = {
    referees: [], // array of selected referee ids
    date: '',
    location: '',
    type: '',
    field: '', // selected field id
    fees: {
        fieldFee: '', // selected field.fee
        refFee: '', // sum of selected referees' fees
        titleFee: '',
        joiningFee: ''
    },
    description: '',
    photos: [],
    playerNeed: '',
};

export default initialValues;
