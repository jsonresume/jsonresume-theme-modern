const fs = require('fs');
const gravatar = require('gravatar');
const _ = require('lodash');
const Handlebars = require("handlebars");

function render(resume) {
	_.each(resume.work, (work) => {
		work.startDateYear = work.startDate.substr(0, 4);
    work.endDateYear = (work.endDate) ? work.endDate.substr(0,4) : 'Present';
	});

	_.each(resume.education, (education) => {
    if (!education.area || !education.studyType)
      education.educationDetail = (education.area == null ? '' : education.area) + (education.studyType == null ? '' : education.studyType);
    else
      education.educationDetail = education.area + ", " + education.studyType;

    education.startDateYear = education.startDate.substr(0, 4);
    education.endDateYear = (education.endDate) ? education.endDate.substr(0, 4) : 'Present';
	});

	if (resume.basics.image === undefined && resume.basics?.email) {
    const gravatarOptions = {
      default: 'mm',
      protocol: 'https',
      rating: 'pg',
      size: '100',
    };

		resume.basics.image = gravatar.url(resume.basics.email, gravatarOptions, true);
	}

	const template = fs.readFileSync(__dirname + '/resume.template', 'utf8');
	return Handlebars.compile(template)({
    resume
  });
}

module.exports = {
	render
}
