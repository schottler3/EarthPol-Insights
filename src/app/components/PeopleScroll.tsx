export default function PeopleScroll({ people }: { people: string[] }) {
  return (
	<div>
	  {people.map((person, index) => (
		<div key={index}>{person}</div>
	  ))}
	</div>
  );
}