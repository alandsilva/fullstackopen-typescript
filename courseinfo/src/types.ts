// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartDescription {
  type: 'normal';
  description: string;
}
interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartDescription {
  type: 'submission';
  description: string;
  exerciseSubmissionLink: string;
}

interface CourseRequirementsPart extends CoursePartDescription {
  type: 'special';
  requirements: string[];
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseRequirementsPart;
