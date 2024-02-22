const mongoose = require("mongoose");

const formSchema = mongoose.Schema({
    form_name: String,
    sections: [
        {
            section_name: String,
            fields: [
                {
                    field_name: String,
                    field_value: String,
                    field_type: String,
                    isRequired: Boolean,
                    dropdown_options: [String]
                },
            ],
        },
    ],
});

const Forms = mongoose.model("Form", formSchema);

module.exports = Forms;
