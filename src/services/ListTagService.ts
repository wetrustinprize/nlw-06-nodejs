import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";
import { classToPlain } from "class-transformer";

class ListTagServices {
  async execute() {
    const tagsRespositories = getCustomRepository(TagsRepositories);

    const tags = await tagsRespositories.find();

    return classToPlain(tags);
  }
}

export { ListTagServices };
