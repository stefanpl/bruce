const path = require('path');

const nameOfLinkToCodebase = 'code';


// let projectsParentDirectory = await createTemporaryDirectory();
// let codeParentDirectory = await createTemporaryDirectory();
// await renderProjectToFolder(mockProject);

// it('should create a project folder with a link to the code folder', async function () {
//   await setupMockProject();
//   let codeName = mockProject.getCodeName();
//   let projectDirectory = path.join(projectsParentDirectory, codeName);
//   let codeDirectory = path.join(codeParentDirectory, codeName);
//   await directoryShouldExist(projectDirectory);
//   await directoryShouldExist(codeDirectory);
//   let codeLink = path.join(projectDirectory, nameOfLinkToCodebase);
//   await expectLinkPointingTo(codeLink, codeDirectory);
// });