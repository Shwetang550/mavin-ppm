const mongoose = require("mongoose");

const formSchema = mongoose.Schema({
    form_name: String,
    form_status: String,
    sections: [
        {
            section_name: String,
            isReviewed: Boolean,
            fields: [
                {
                    field_name: String,
                    field_value: String,
                    field_type: String,
                    isTooltipShown: Boolean,
                    tooltipMessage: String,
                    isRequired: Boolean,
                    dropdown_options: [String]
                },
            ],
        },
    ],
});

const Forms = mongoose.model("Form", formSchema);

module.exports = Forms;
