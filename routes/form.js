const express = require("express");
const Joi = require("joi");
const Form = require("../models/form");

const router = express.Router();

// gets all forms from db
router.get("/", async (req, res) => {
    const forms = await Form.find();

    res.json(forms);
});

// getting single form from db
router.get("/:id", async (req, res) => {
    const form = await Form.findById(req.params.id);

    if (!form) {
        res.status(404).send("Form with the given ID was not found!");
        return;
    }

    res.json(form);
});

// add form into the db
router.post("/", async (req, res) => {
    // validating form-data
   const joiSchema = Joi.object({
       form_name: Joi.string().min(3).required(),
       form_status: Joi.string().allow(null, ''),
        sections: Joi.array().items({
            section_name: Joi.string().min(2),
            isReviewed: Joi.boolean().default(false),
            fields: Joi.array().items({
                field_name: Joi.string().allow(null, ''),
                field_value: Joi.string().allow(null, ''),
                field_type: Joi.string().allow(null, ''),
                isTooltipShown: Joi.boolean().default(true),
                tooltipMessage: Joi.string().allow(null, ''),
                isRequired: Joi.boolean().default(false),
                dropdown_options: Joi.array().items(Joi.string())
            }),
        }),
    });

    const result = joiSchema.validate(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0]?.message);
        return;
    }

    // pushing validated data to db
    const forms = new Form({
        form_name: req.body.form_name,
        sections: [...req.body.sections],
    });

    const dbResult = await forms?.save();
    res.json(forms);
});

// updating a form from db
router.put("/:id", async (req, res) => {
    const form = await Form.findById(req.params.id);

    if (!form) {
        res.status(404).send("Form with the given ID was not found!");
        return;
    }

    // validating form-data
    const joiSchema = Joi.object({
       form_name: Joi.string().min(3).required(),
       form_status: Joi.string().allow(null, '').default('not reviewed'),
        sections: Joi.array().items({
            section_name: Joi.string().min(2),
            isReviewed: Joi.boolean().default(false),
            fields: Joi.array().items({
                field_name: Joi.string().allow(null, ''),
                field_value: Joi.string().allow(null, ''),
                field_type: Joi.string().allow(null, ''),
                isTooltipShown: Joi.boolean().default(true),
                tooltipMessage: Joi.string().allow(null, ''),
                isRequired: Joi.boolean().default(false),
                dropdown_options: Joi.array().items(Joi.string())
            }),
        }),
    });

    const result = joiSchema.validate(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0]?.message);
        return;
    }

    const dbResult = await Form.findByIdAndUpdate(req.params.id, {
        form_name: req.body.form_name,
        sections: [...req.body.sections],
    });

    res.json(dbResult);
});

// deleting a form
router.delete("/:id", async (req, res) => {
    await Form.findByIdAndDelete(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err?.message));
});

module.exports = router;
