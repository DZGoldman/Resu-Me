# Text Analysis notes
11/23

## Data Structure

--------------------------------------------------------------------------------

### Sections to remove:
```
resume.education[i]
resume.education[i].degree
resume.education[i].school
```
- We don't need an education section - it's not relevant data because (1.) it's mostly proper nouns and (2.) the user can't **reword this section of the resume**.

```
resume.experiences[i].jobtitle
```
- Neither can they change the names of the positions that they held (aka **job titles in experience**) **the experiences array only needs description**


```
resume.summary.info[]
```
- The info section doesn't need to be in an array

## Current Data Structure

```
   {
      education: [{
         degree:'',
         school:''
      }],
      experiences[{
         jobdescription: "",
         jobtitle: ""}],
      summary: {
         info:[""],
         jobtitle: ''
      }
   }
```


## Needed data structure

```
{
   title: "",   //used to be this.summary.jobtitle
   summary: "",
   experience: [""], // doesn't need each job title
}
```
Right now the correlations are on a pretty small scale (though the largest is often magnitudes larger than the rest)

in order to increase accuracy, we need to **increase the number of inputs**, not increase the amount of text in each value.
