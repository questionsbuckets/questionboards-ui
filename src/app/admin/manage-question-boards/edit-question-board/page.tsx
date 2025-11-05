import EditQuestionBoards from '@/app-pages/admin/manage-question-boards/add-question-board/EditQuestionBoard'
import React, { Suspense } from 'react'

const EditQuestionBoardsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditQuestionBoards />
  </Suspense>
  );
};

export default EditQuestionBoardsPage;