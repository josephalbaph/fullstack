import React from "react";

const Header = ({ name }) => <h2>{name}</h2>;

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))}
  </div>
);

const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => (s += p.exercises), 0);
  return (
    <div>
      <strong>total of {total} exercises</strong>
    </div>
  );
};

const Course = ({ course }) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);


export default Course;
