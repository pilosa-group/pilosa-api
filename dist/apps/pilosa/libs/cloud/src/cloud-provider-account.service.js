"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudProviderAccountService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cloud_provider_account_entity_1 = require("./entities/cloud-provider-account.entity");
let CloudProviderAccountService = class CloudProviderAccountService {
    constructor(cloudProviderAccountRepository) {
        this.cloudProviderAccountRepository = cloudProviderAccountRepository;
    }
    async findOneLatestImported() {
        return this.cloudProviderAccountRepository
            .createQueryBuilder('cpa')
            .where('cpa.lastImportedAt < :lastImportedAt', {
            lastImportedAt: new Date(new Date().getTime() - 5 * 60 * 1000),
        })
            .orderBy('cpa.lastImportedAt', 'ASC')
            .getOne();
    }
    async save(cloudProviderAccount) {
        return this.cloudProviderAccountRepository.save(cloudProviderAccount);
    }
    async findAllByProject(project) {
        return this.cloudProviderAccountRepository
            .createQueryBuilder('cpa')
            .where('cpa.projectId = :projectId', { projectId: project.id })
            .getMany();
    }
};
exports.CloudProviderAccountService = CloudProviderAccountService;
exports.CloudProviderAccountService = CloudProviderAccountService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cloud_provider_account_entity_1.CloudProviderAccount)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CloudProviderAccountService);
//# sourceMappingURL=cloud-provider-account.service.js.map