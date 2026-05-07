# Backend API Documentation

This document provides a list of all available API routes in the backend.

## Auth Routes (/auth)
- POST /auth/login - User login
- GET /auth/logout - User logout
- POST /auth/register - Register a new user
- GET /auth/check-auth - Verify user authentication token

## Card Routes (/card/data)
- POST /card/data - Create a new card in a list
- GET /card/data?list=[id] - Get all cards for a specific list
- GET /card/data/:id - Get a specific card by ID
- PUT /card/data/:id - Update card details
- PUT /card/data/:id/move - Move card to a different list
- PUT /card/data/:id/reorder - Reorder card within the same list
- PUT /card/data/:id/complete - Mark card as completed
- PUT /card/data/:id/incomplete - Mark card as incomplete
- PUT /card/data/:id/archive - Archive card
- PUT /card/data/:id/unarchive - Unarchive card
- DELETE /card/data/:id - Delete a card
- POST /card/data/:id/members - Assign a member to a card
- DELETE /card/data/:id/members/:userId - Remove a member from a card
- POST /card/data/:id/labels - Add a label to a card
- DELETE /card/data/:id/labels/:labelId - Remove a label from a card
- POST /card/data/:id/checklist - Add a checklist item
- PUT /card/data/:id/checklist/:itemId - Toggle a checklist item
- DELETE /card/data/:id/checklist/:itemId - Delete a checklist item
- POST /card/data/:id/comments - Add a comment to a card
- PUT /card/data/:id/comments/:commentId - Update a comment
- DELETE /card/data/:id/comments/:commentId - Delete a comment

## Activity Routes (/activity)
- GET /activity?workspace=[id] - Get activity feed for a workspace (can filter by entityType and entityId)
- GET /activity/me - Get activity performed by the current user

## Page Routes (/page)
- POST /page - Create a new page
- GET /page?workspace=[id] - Get all top-level pages in a workspace
- GET /page/:id - Get a specific page by ID
- PUT /page/:id - Update page details
- PUT /page/:id/cover - Update page cover image
- PUT /page/:id/move - Move page to a different parent
- PUT /page/:id/archive - Archive page
- PUT /page/:id/unarchive - Unarchive page
- PUT /page/:id/favorite - Toggle page favorite status
- DELETE /page/:id - Delete a page and its children

## Board Routes (/board)
- GET /board/templates - Get all board templates
- POST /board/from-template - Create a new board from a template
- POST /board - Create a new board
- GET /board?workspace=[id] - Get all boards in a workspace
- GET /board/:id - Get a specific board by ID with lists and cards
- PUT /board/:id - Update board details
- PUT /board/:id/archive - Archive board
- PUT /board/:id/unarchive - Unarchive board
- DELETE /board/:id - Delete a board along with its lists and cards
- POST /board/:id/members - Add a member to a board
- PUT /board/:id/members/:userId - Update member role on a board
- DELETE /board/:id/members/:userId - Remove a member from a board
- POST /board/:id/save-template - Save a board as a template
